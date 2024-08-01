timeline:
	julia _code/timeline.jl

serve:
	bundle exec jekyll serve

test: timeline serve

push: 
	git add .
	git commit -m "Updated timeline"
	git push

all: timeline push