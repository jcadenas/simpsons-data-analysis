class Character < ActiveRecord::Base
  has_many :script_lines,
    primary_key: :character_id,
    foreign_key: :character_id,
    class_name: :ScriptLine

end
