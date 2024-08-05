# list_all_schools.jl
# Purpose: Retrieve a list of all schools from the Airtable School table and save them to a YAML file
# Status: Needs to run periodically to update the school codes
# ---------------------------------------------------------------------------

include("utils.jl")

api_token = get_api_token()
url = "https://api.airtable.com/v0/appB7fytDJbPEqgRF/School"
headers = ["Authorization" => "Bearer $api_token"]

response = make_request(url, headers)

# Check the status code and process the response if successful
if response.status == 200
    println("Retrieved list of schools successfully")
    schools = parse_response_list_schools(response)

    #update local school_codes
    save_to_yaml(schools, "_data/school_codes.yml")
    println("School codes have been saved to _data/school_codes.yml")
else
    println("Request failed with status code: $(response.status)")
    println("Response Body:")
    println(String(response.body))
end
