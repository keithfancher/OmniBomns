JSHINT_OPTIONS="/*jshint browser:true, devel:true */"
SOURCES=src/config.js src/util.js src/player.js src/levelobject.js \
				src/bomn.js src/level.js src/game.js src/main.js
CONCAT=bin/concat.js
MIN=bin/min.js

all: ugly

concat:
	@echo "Concatenating .js files..."
	@mkdir -p bin
	@echo $(JSHINT_OPTIONS) > $(CONCAT)
	@cat $(SOURCES) >> $(CONCAT)
	@echo "Concatenated!"

hint: concat
	@echo "Running jshint..."
	@jshint $(CONCAT)
	@echo "YOUR JAVASCRIPT IS AWESOME."

ugly: hint
	@echo "Uglifying your beautiful .js files..."
	@uglifyjs $(CONCAT) > $(MIN)
	@echo "Okay, it's pretty ugly now!"

clean:
	rm -f $(CONCAT) $(MIN)
	@echo "All clean!"
