using HTTP
using JSON3
using YAML
using Dates

SCHOOL_CODES = YAML.load(open("_data/school_codes.yml"))

# Function to get API token from environment variables
function get_api_token()
    return ENV["AIRTABLE_API_TOKEN"]
end

# Make post request
function make_post_request(url::String, headers::Vector{Pair{String, String}}, body::Dict)
    # Convert the body dictionary to a JSON string

    #if body is empty, post without body
    if isempty(body)
        return HTTP.post(url, headers)
    else
        json_body = JSON3.write(body)
        return HTTP.post(url, headers, json_body)
    end
end


# Function to make an HTTP GET request and return the response
function make_request(url::String, headers::Vector{Pair{String, String}})
    return HTTP.get(url, headers)
end

# Function to parse JSON response and extract school records
function parse_response_list_schools(response::HTTP.Response)
    response_json = JSON3.read(String(response.body))
    records = response_json[:records]
    schools = Dict{String, String}()
    for record in records
        school_id = record[:id]
        school_code = record[:fields][:Name]
        schools[school_code] = school_id
    end
    return schools
end

# Function to save school data to a YAML file
function save_to_yaml(schools::Dict{String, String}, filepath::String)
    open(filepath, "w") do io
        YAML.write(io, schools)
    end
end


# Function to insert record
function insert_record(url::String, data::Dict{String, Dict{String, Any}})
    api_token = get_api_token()
    headers = [
        "Authorization" => "Bearer $api_token",
        "Content-Type" => "application/json"
    ]

    # Convert the data dictionary to a JSON string
    json_data = JSON3.write(data)

    # Make the HTTP POST request
    response = HTTP.post(url, headers, json_data)

    # Check the status code and process the response if successful
    if response.status == 200 || response.status == 201
        println("Record inserted successfully")
        response_json = JSON3.read(String(response.body))
        println("Response: ", response_json)
    else
        println("Failed to insert record with status code: $(response.status)")
        println("Response Body:")
        response_json = JSON3.read(String(response.body))
        println("Response: ", response_json)
    end

    return response_json
end

# Function to format a record for insertion
function format_record(record::Dict{Any, Any}, school_codes::Dict{Any, Any}=SCHOOL_CODES)
    school_code = school_codes[record["school"]]
    formatted_record = Dict(
        "fields" => Dict(
            "Name" => record["name"],
            "Web" => record["web"],
            "School" => [school_code],
            "Date" => string(record["date"]),
            "Countdown" => record["countdown"],
            "Type" => record["type"]
        )
    )
    return formatted_record
end


function code2school(code::String, school_codes=SCHOOL_CODES)
    #return the key whose value is code
    for (key, value) in school_codes
        if value == code
            return key
        end
    end
end


# Function to parse JSON response into timeline
function parse_timeline_record(record)
    fields = record[:fields]
    timeline = Dict(
        "id" => record[:id],
        "name" => fields[:Name],
        "web" => fields[:Web],
        "school" => code2school(string(fields[:School][1])),
        "date" => Date(fields[:Date]),
        "countdown" => fields[:Countdown],
        "type" => fields[:Type],
        "active" => fields[:Active]
    )
    return timeline
end


function post_request_all_records(url::String, offset_key::String="")
    api_token = get_api_token()
    post_headers = [
    "Authorization" => "Bearer $api_token",
    "Content-Type" => "application/json"
]
    post_body = Dict()
    if offset_key != ""
        post_body = Dict("offset" => offset_key)        
    end
    response = make_post_request(url, post_headers, post_body)
    return response
end

read_response(response::HTTP.Response) = JSON3.read(String(response.body))

function read_response(response::HTTP.Response)
    return JSON3.read(String(response.body))
end


function get_all_records(url::String; max_iter=99)

    iter = 0
    records = []
    init_response = post_request_all_records(post_url)

    #if response is successful, parse the response
    if init_response.status == 200
        data = read_response(init_response)
        records = data["records"]

        while haskey(data, "offset") && iter < max_iter
            iter += 1
            offset = data["offset"]
            new_response = post_request_all_records(post_url, offset)        
            if new_response.status == 200
                data = read_response(new_response)
                records = vcat(records, data["records"])
            else
                println("Failed to fetch records with status code: $(new_response.status)")
                println("Response Body:")
                println(String(new_response.body))
                data = Dict()
            end
        end
    end

    return records
end
