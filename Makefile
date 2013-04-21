
build: components
	@./node_modules/.bin/component build --dev --standalone flokk

components: component.json
	@./node_modules/.bin/component install --dev

clean:
	rm -fr build components

.PHONY: clean build
