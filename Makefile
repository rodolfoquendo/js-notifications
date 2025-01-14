publish: 
	@npm publish --access public
test:
	@npm install
	@NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest
	@make coverage-report
coverage-report:
	@open coverage/lcov-report/index.html
