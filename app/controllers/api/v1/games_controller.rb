class Api::V1::GamesController < ApplicationController
    def new
        array = ["a", "e", "i", "o", "u", "s", "d", "t", "m", "l", "y", "a", "e", "i", "o", "u", "m", "n", "a", "e", "i", "o", "u"]
        new_array = []
        for a in 1..16 do      
            new_array.push(array.sample)             
        end
        render json: new_array
    end 

    def index
    end    
    
    def word_check
        word = params[:word].to_s
        puts "Word is #{word}"
        puts "Word length is #{word.length}"
        @msg = ""
        if word.length < 3
            @point_to_add = 0
            @msg = "Word length must be greater than or equal to 3"
            render 'point'
            return
        end

        if DICTIONARY.include?(word)
            @points_to_add = word.length 
            @msg = "Correct Word"
        else
            @point_to_add = 0
            @msg = "Incorrect word"  
        end    
        render 'point'   

    end    
end
