require 'rails_helper'

RSpec.describe Api::V1::GamesController, type: :controller do
    describe '.get #word_check' do
        context 'word check' do           
            it 'Check word' do   
                param = {
                    "word": "Great"
                }
                get :word_check, params:param, :format => :json
                expect(response.status).to eq(200)
            end
        end
    end  
    
    context '.get new' do           
        it 'Generate array' do   
            get :new, :format => :json
            expect(response.status).to eq(200)
        end
    end

end
