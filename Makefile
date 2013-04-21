
build: components
	@component build --dev --standalone flokk

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean build
