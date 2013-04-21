
build: components
	@./node_modules/.bin/component build --copy --standalone flokk --prefix "/public"

build-dev: components
	@./node_modules/.bin/component build --dev --standalone flokk

components: component.json
	@./node_modules/.bin/component install

clean:
	rm -fr build components

.PHONY: clean build
