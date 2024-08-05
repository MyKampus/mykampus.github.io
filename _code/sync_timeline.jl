# sync_timeline.jl
# Purpose: Update the local timeline.yml file with Timeline records from Airtable
# Status: Needs to run periodically to update the timeline data
# ---------------------------------------------------------------------------

include("utils.jl")

post_url = "https://api.airtable.com/v0/appB7fytDJbPEqgRF/Timeline/listRecords"
records = get_all_records(post_url)

# Parse the records and extract the timeline data
events = []
for record in records
   push!(events, parse_timeline_record(record))
end

months_id = YAML.load_file("_data/months_id.yml")

# Get the current date
current_date = Dates.today()

# Separate future and past events
future_events = filter(event -> event["date"] >= current_date, events)
past_events = filter(event ->event["date"] < current_date, events)

# Sort future events in ASC and past events DESC, then combine
sort!(future_events, by = event -> event["date"])
sort!(past_events, by = event -> event["date"], rev=true)
sorted_events = vcat(future_events, past_events)

# Sort
sorted_data = Dict(    
    "months_id" => months_id,
    "events" => sorted_events    
)

# Save
open("_data/timeline.yml", "w") do io
    YAML.write(io, sorted_data)
end

# Done
println("Sorted events have been saved to _data/timeline.yml")
