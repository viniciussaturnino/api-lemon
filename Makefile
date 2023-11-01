include .env

# Docker
.PHONY: build
build:
	docker compose up --build

.PHONY: up
up:
	docker compose up

# Testes
.PHONY: test
test:
	npm run test

.PHONY: coverage
coverage:
	npm run cov
