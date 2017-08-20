json.array! @locations do |location|
  json.location_id location['loc_id']
  json.name location['name']
  json.line_count location['line_count']
end
