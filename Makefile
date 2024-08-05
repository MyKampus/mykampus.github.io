timeline:
	julia --project=_code _code/sync_timeline.jl

serve:
	bundle exec jekyll serve

test: timeline serve

push: 
	git add .
	git commit -m "Updated timeline"
	git push

all: timeline push