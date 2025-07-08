FROM oven/bun:1.1

WORKDIR /app

# Copy dependency files first
COPY bun.lockb package.json ./
RUN bun install

# Copy source code
COPY . .

# Build the project (compiles TypeScript to JS)
RUN bun build src/index.ts --outdir dist

EXPOSE 3000

# Run the built JavaScript
CMD ["bun", "run", "dist/index.js"]
