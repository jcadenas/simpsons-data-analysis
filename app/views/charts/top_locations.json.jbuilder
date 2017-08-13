json.array! @top_locations do |location|
  json.loc_id location['loc_id']
  json.name location['name']
  json.line_count location['line_count']
end
