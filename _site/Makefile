timeline:
	julia _code/timeline.jl

build:
	bundle exec jekyll build

test: timeline build

push: 
	timeline
	git add .
	git commit -m "Updated timeline"
	git push