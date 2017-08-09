class ChartsController < ApplicationController

  def top_characters
    @top_characters = ScriptLines
      .select()



    render json: ['oh shit, top_characters worked']
  end

end
