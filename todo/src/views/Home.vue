<template>
  <div class="container mt-5">
    <h1 class="text-center">Student List</h1>

    <!-- v-if block for editing student -->
    <div v-if="Object.keys(currentStudent).length !== 0">
      <h1>Edit Student</h1>
      <form @submit.prevent="updateStudent(currentStudent.id)">

      <div class="mb-3 mt-5 col-6">
        <input type="email" class="form-control" id="email" placeholder="Email" v-model="currentStudent.email">
      </div>
      <div class="mb-3 col-6">
        <input type="text" class="form-control" id="Course" placeholder="Course" v-model="currentStudent.course">
      </div>
      <div class="mb-3 col-6">
        <input type="text" class="form-control" id="Name" placeholder="Name" v-model="currentStudent.name">
      </div>
      <div class="mb-3 col-6">
        <input type="text" class="form-control" id="Gender" placeholder="Gender" v-model="currentStudent.gender">
      </div>
<button type="submit" class="btn btn-primary">Update</button>
    </form>

    </div>

    <!-- v-else block for creating student -->
    <div v-else>
      <h4 class="text-center">Create Student</h4>
      <form @submit.prevent="saveStudent">
      <div class="mb-3 mt-5 col-6">
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email" v-model="student.email">
      </div>
      <div class="mb-3 col-6">
        <input type="text" class="form-control" id="Course" placeholder="Course" v-model="student.course">
      </div>
      <div class="mb-3 col-6">
        <input type="text" class="form-control" id="Name" placeholder="Name" v-model="student.name">
      </div>
      <div class="mb-3 col-6">
        <input type="text" class="form-control" id="Gender" placeholder="Gender" v-model="student.gender">
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
    </div>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Course</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.course }}</td>
            <td>{{ student.gender }}</td>
            <td>
              <button class="btn btn-warning me-1" @click="editBtn(student.id)">Edit</button>
              <button class="btn btn-danger" @click="deleteStudent(student.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      students: [],
      currentStudent: {}, // currentStudent initialized in the data property
      api: 'http://127.0.0.1:8000/api',
      student: {
        name: '',
        course: '',
        email: '',
        gender: ''
      }
    };
  },
  methods: {
    getStudents() {
      console.log('Fetching students');
      axios.get(this.api + '/students/')
        .then(response => {
          console.log(response.data);
          this.students = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveStudent() {
      console.log('save.student');
      axios.post(this.api + '/students/', this.student)
        .then(response => {
          console.log(response.data);
          this.getStudents();
          this.student = {
            name: '',
            course: '',
            email: '',
            gender: ''
          };
        })
        .catch(error => {
          console.log(error);
        });
    },
    editBtn(id) {
      console.log('editlog', id);
      this.students.map(student => {
        if (student.id === id) {
          console.log(student.name);
          this.currentStudent = {
            id: student.id,
            name: student.name,
            course: student.course,
            email: student.email,
            gender: student.gender
          };
        }
      });
    },
    updateStudent(id){
      axios.put(this.api + `/students/${id}/`, this.currentStudent)
        .then(response => {
          console.log(response.data);
          this.getStudents();
          this.currentStudent = {};
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    deleteStudent(id){
      axios.delete(this.api + `/students/${id}/`, id)
        .then(response => {
          console.log(response.data);
          this.getStudents();
      
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    console.log('DOM Mounted');
    this.getStudents();
    console.log(Object.keys(this.currentStudent).length);
  }
};
</script>
