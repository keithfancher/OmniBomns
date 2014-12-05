JSHINT_OPTIONS="/*jshint browser:true*/"
SOURCES=src/bomns/config.js src/bomns/util.js src/bomns/player.js \
		src/bomns/levelobject.js src/bomns/bomn.js src/bomns/level.js \
		src/bomns/game.js src/bomns.js
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
