import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from '../Services/TaskService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';  // Ensure HttpClientModule is imported
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  standalone: true,
  imports: [
    CommonModule,  // Ensure CommonModule is imported
    FormsModule,   // Import FormsModule for ngModel
    HttpClientModule, // Import HttpClientModule to use HttpClient in TaskService
  ],
})
export class TaskComponent {
  title: string = '';
  description: string = '';
  status: string = 'Active';  // Status field for task
  tasks: Task[] = [];
  taskToEdit: Task | null = null;  // Track the task being edited
  loading: boolean = false;  // Flag to show loading spinner or message
  currentItem: Task | null = null;
  @ViewChild('editModal') editModal: any; // Add this line


  constructor(private taskService: TaskService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getTasks();
  }

  // Fetch tasks from the backend
  getTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe(
      (response) => {
        console.log('API Response:', response);  // Log the response for debugging
        if (response.success) {
          this.tasks = response.data;
        } else {
          console.error('Failed to fetch tasks');
        }
        this.loading = false;  // Stop loading indicator
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.loading = false;  // Stop loading indicator
      }
    );
  }
  
  resetForm() {
    this.title = '';
    this.description = '';
  }

  // Open modal for creating or editing a task
  open(content: any) {
    this.modalService.open(content);
  }
 
  openEditModal(item: Task) {
    this.taskToEdit = { ...item }; // Set taskToEdit directly
    console.log('Current item to edit:', this.taskToEdit);
    this.modalService.open(this.editModal); // Open the modal
  }
  

  addTask() {
    if (this.title && this.description) {
      const newTask = { 
        title: this.title, 
        description: this.description, 
        status: this.status  // Use the selected status
      };

      this.loading = true;
      this.taskService.createTask(newTask).subscribe(
        (task) => {
          console.log('Task added:', task);
          this.tasks.push(task);
          this.title = '';
          this.description = '';
          this.status = 'Active';  // Reset to default status
          this.loading = false;
          this.getTasks();
          this.closeModal(); 
        },
        (error) => {
          console.error('Error adding task:', error);
          this.loading = false;
        }
      );
    } else {
      console.log('Title and Description are required!');
    }
  }
  

  // Delete a task
  deleteTask(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'question',
      iconColor: "red",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#19d125',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.loading = true;
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task._id !== id);
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');

        console.log('Task deleted');
        this.loading = false;
      },
      (error) => {
        console.error('Error deleting task:', error);
        this.loading = false;
        Swal.fire('Error!', 'There was an error deleting the item.', 'error');

      }
    );
  }
})}



  // Update an existing task
  updateTask() {
    if (this.taskToEdit) {
      const updatedTask: Task = { 
        _id: this.taskToEdit._id, 
        title: this.taskToEdit.title, 
        description: this.taskToEdit.description, 
        status: this.taskToEdit.status 
      };
  
      this.loading = true;
      this.taskService.updateTask(updatedTask._id, updatedTask).subscribe(
        (task) => {
          const index = this.tasks.findIndex(t => t._id === task._id);
          if (index !== -1) {
            this.tasks[index] = task;
          }
          console.log('Task updated:', task);
          this.closeModal();  // Close modal after update
          this.loading = false;
          this.getTasks();
        },
        (error) => {
          console.error('Error updating task:', error);
          this.loading = false;
        }
      );
    }
  }
  
  // Close modal and reset form
  closeModal() {
    this.modalService.dismissAll();  // Close the modal
    this.taskToEdit = null;  // Reset taskToEdit
    this.title = '';
    this.description = '';
  }
}
