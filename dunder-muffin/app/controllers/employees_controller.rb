class EmployeesController < ApplicationController
    def index
        @employees = Employee.all
    end

    def show
       set_employee
       @dog = Dog.find(@employee.dog_id)
    end

    def new
        @employee = Employee.new
    end

    def create
        @employee = Employee.new(employee_params)
        if @employee.save
            redirect_to @employee
        else
            flash[:error_message] = @employee.errors.full_messages
            render :new
        end
    end

    def edit
        set_employee
    end

    def update
        set_employee
        if @employee.update(employee_params)
            redirect_to @employee
        else
            flash[:error_message] = @employee.errors.full_messages
            render :edit
        end
    end

    def delete

    end


    private

    def set_employee
        @employee = Employee.find(params[:id])
    end

    def employee_params
        params.require(:employee).permit(:first_name, :last_name, :alias, :title, :office, :img_url, :dog_id)
    end
end
