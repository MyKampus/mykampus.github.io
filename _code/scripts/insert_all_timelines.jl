# Purpose: Insert all timeline.yml records into the Airtable Timeline table
# Status: Completed
# ---------------------------------------------------------------------------

# include("_code/utils.jl")

# url = "https://api.airtable.com/v0/appB7fytDJbPEqgRF/Timeline"

# #read data from _data/timeline.yml
# data = YAML.load(open("_data/timeline.yml"))
# events = data["events"]

# for event in events
#     new_record = insert_record(url, format_record(event))
# end

