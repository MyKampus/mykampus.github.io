using Dates
using YAML

# Read and parse the YAML data
yaml_data = YAML.load_file("_data/timeline_data.yml")

# Extract events from the YAML data
events = yaml_data["events"]
# [println(event_, typeof(event_)) for event_ in events]

# Get the current date
current_date = Dates.today()

# Separate future and past events
future_events = filter(event -> event["date"] >= current_date, events)
past_events = filter(event ->event["date"] < current_date, events)

# Sort future events in ascending order
sort!(future_events, by = event -> event["date"])

# Sort past events in descending order
sort!(past_events, by = event -> event["date"], rev=true)

# Combine sorted future and past events
sorted_events = vcat(future_events, past_events)

# Create a new YAML structure with sorted events
sorted_yaml = Dict(    
    "months_id" => yaml_data["months_id"],
    "events" => sorted_events    
)

# Save the sorted YAML to a new file
open("_data/timeline.yml", "w") do io
    YAML.write(io, sorted_yaml)
end

println("Sorted events have been saved to _data/timeline.yml")
