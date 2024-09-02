.PHONY: up
up:
	yarn dev

.PHONY: start
start:
	yarn start

.PHONY: build
build:
	yarn build

.PHONY: export
export:
	yarn export

.PHONY: search
search:
	python -m venv search-venv; \
		. search-venv/bin/activate; \
		pip install -r scripts/requirements.txt; \
		python scripts/build_search_index.py; \
		rm -rf search-venv;
