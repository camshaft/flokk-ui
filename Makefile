
build: components
	@./node_modules/.bin/component build --copy --use ./nghtml --standalone flokk --prefix "/public"

components: component.json
	@./node_modules/.bin/component install

clean:
	rm -fr build components

.PHONY: clean build
