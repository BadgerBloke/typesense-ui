.PHONY: build-development
build-development: ## Build the development docker image.
	cp ~/secrets/imageai/.env.development .env.production
	docker compose -f docker\development-compose.yml build --build-arg ENV_FILE=.env.production

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker\development-compose.yml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker\development-compose.yml down

.PHONY: build-staging
build-staging: ## Build the staging docker image.
	cp ~/secrets/imageai/.env.staging .env.production
	docker compose -f docker/staging-compose.yml build --build-arg ENV_FILE=.env.production

.PHONY: start-staging
start-staging: ## Start the staging docker container.
	docker compose -f docker/staging-compose.yml up -d

.PHONY: stop-staging
stop-staging: ## Stop the staging docker container.
	docker compose -f docker/staging-compose.yml down
  
.PHONY: build-production
build-production: ## Build the production docker image.
	cp ~/secrets/imageai/.env.production .env.production
	docker compose -f docker/production-compose.yml build --build-arg ENV_FILE=.env.production

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker/production-compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker/production-compose.yml down
