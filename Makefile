BE_YARN = yarn --cwd backend/
SPEC_YARN = yarn --cwd api-spec/
BE_DOCKER = docker compose -f ./backend/docker-compose.yml

.up:
	${BE_DOCKER} up -d

.build-spec:
	${SPEC_YARN} build

down:
	${BE_DOCKER} down --remove-orphans

dev: .up .build-spec
	${BE_YARN} dev

dev-spec:
	${SPEC_YARN} dev

test: .up
	${BE_YARN} test

test-cov: .up
	${BE_YARN} test:cov

shell:
	${BE_YARN} repl