SERVICES := $(shell find services -maxdepth 1 -mindepth 1 -type d)
FUNCTIONS := $(shell find functions -maxdepth 1 -mindepth 1 -type d)
APP := $(shell find app -maxdepth 1 -mindepth 1 -type d)

PROTOC        := protoc
PROTOC_GEN_TS := ./node_modules/.bin/protoc-gen-ts_proto

PROTO_SRC     := protobuffs
OUT_DIR       := ./protobuffs/generated
PROTO_FILES   := $(shell find $(PROTO_SRC) -name "*.proto")

.PHONY: install dev all install-app kill-ports protos clean-protos update

install:
	@for dir in $(SERVICES) $(FUNCTIONS) $(APP); do \
		echo "Installing in $$dir..."; \
		(cd $$dir && bun install); \
	done

dev:
	@for dir in $(SERVICES) $(FUNCTIONS) $(APP); do \
		echo "Starting dev in $$dir..."; \
		(cd $$dir && bun run dev) & \
	done
	wait

all: install dev

install-app:
	@if [ -z "$(package)" ]; then \
		echo "❌ Usage: make install-app package=your-package-name"; \
		exit 1; \
	fi
	@for dir in $(SERVICES) $(FUNCTIONS); do \
		echo "📦 Adding '$(package)' in $$dir..."; \
		(cd $$dir && bun add $(package)); \
	done

kill-ports:
	@echo "Killing processes on ports 3000–3012..."
	@sudo lsof -ti :3000-3012 | xargs -r kill -9 || true

protos:
	@echo "📦 Generating TypeScript from Protobufs..."
	@mkdir -p $(OUT_DIR)
	$(PROTOC) \
		--plugin=$(PROTOC_GEN_TS) \
		--ts_proto_out=$(OUT_DIR) \
		--ts_proto_opt=esModuleInterop=true,forceLong=long,useOptionals=all \
		--proto_path=$(PROTO_SRC) \
		$(PROTO_FILES)

clean-protos:
	@echo "🧹 Cleaning generated protobufs..."
	rm -rf $(OUT_DIR)

update:
	@for dir in $(SERVICES) $(FUNCTIONS) $(APP); do \
		echo "Checking for outdated packages in $$dir..."; \
		(cd $$dir && bun outdated); \
		echo "Updating packages in $$dir..."; \
		(cd $$dir && bun update); \
	done

generate-envs:
	@echo "🔧 Generating or updating DATABASE_URL in .env files for all services..."
	@PG_USER=user; \
	PG_PASS=pass; \
	PG_HOST=localhost; \
	PG_PORT=5432; \
	for dir in $(SERVICES); do \
		service_name=$$(basename $$dir); \
		db_name=$$(echo $$service_name | sed 's/-service$$//' | sed 's/^order$$/orders/'); \
		env_path="$$dir/.env"; \
		mkdir -p "$$dir"; \
		url="postgresql://$$PG_USER:$$PG_PASS@$$PG_HOST:$$PG_PORT/$$db_name"; \
		if [ -f $$env_path ]; then \
			if grep -q '^DATABASE_URL=' $$env_path; then \
				sed -i "s|^DATABASE_URL=.*|DATABASE_URL=$$url|" $$env_path; \
			else \
				echo "DATABASE_URL=$$url" >> $$env_path; \
			fi; \
		else \
			echo "DATABASE_URL=$$url" > $$env_path; \
		fi; \
		echo "✅ Set DATABASE_URL in $$env_path"; \
	done


