class DogsController < ApplicationController

    def index
        @dogs = Dog.all
    end

    def show
        set_dog
       @employees = Employee.all.select {|e| e.dog_id == @dog.id}
    end

    def new
        @dog = Dog.new
    end

    def create
        @dog = Dog.new(dog_params)
        if @dog.save
            redirect_to @dog
        else
            render :new
        end
    end

    def edit
        set_dog
    end

    def update

    end

    def delete

    end


    private

    def set_dog
        @dog = Dog.find(params[:id])
    end

    def dog_params
        params.require(:dog).permit(:name, :breed, :age)
    end
end
