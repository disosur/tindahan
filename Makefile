SERVICES := $(shell find services -maxdepth 1 -mindepth 1 -type d)

.PHONY: install dev all install-app kill-ports

install:
	@for dir in $(SERVICES); do \
		echo "Installing in $$dir..."; \
		(cd $$dir && bun install); \
	done

dev:
	@for dir in $(SERVICES); do \
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
	@for dir in $(SERVICES); do \
		echo "📦 Adding '$(package)' in $$dir..."; \
		(cd $$dir && bun add $(package)); \
	done

kill-ports:
	@echo "Killing processes on ports 3000–3012..."
	@sudo lsof -ti :3000-3012 | xargs -r kill -9 || true
