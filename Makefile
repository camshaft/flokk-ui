prod: build build/build.min.js hash

build: components
	@./node_modules/.bin/component build --copy --use ./nghtml --standalone flokk

components: component.json
	@./node_modules/.bin/component install

build/build.min.js: build/build.js
	@./node_modules/.bin/uglifyjs --compress --mangle -o build/build.min.js build/build.js

# build/build.min.css: build/build.css
# 	@./node_modules/.bin/styl --compress < $< > $@

hash: $(wildcard build/*)
	@./node_modules/.bin/simple-assets --glob 'build/**/!(cache-)*' --copy --prefix cache-

clean:
	rm -fr build components

.PHONY: clean build prod
