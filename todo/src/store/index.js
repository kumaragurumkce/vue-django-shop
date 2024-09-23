import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    students: [],
    categories:[],
    items:[],
    products:[],
    currentStudent: {},
    api: 'http://127.0.0.1:8000/api',
    student: {
      name: '',
      course: '',
      email: '',
      gender: ''
    }
  },
  mutations: {
    
    SET_STUDENTS(state, students) {
    state.students = students;
    },
    SET_CATEGORIES(state,categories){
    state.categories=categories
    },
    SET_ITEMS(state,items){
    state.items=items
    },
    SET_PRODUCTS(state,products){
    state.products=products
    },
    ADD_CATEGORY(state,category){
    state.categories.push(category);
    },
    ADD_ITEMS(state,items){
    state.items=items
    },
    ADD_PRODUCTS(state,products){
    state.products=products
    },
    SET_CURRENT_STUDENT(state, student) {
      state.currentStudent = student;
    },
    RESET_CURRENT_STUDENT(state) {
      state.currentStudent = {};
    },
    RESET_NEW_STUDENT(state) {
      state.student = { name: '', course: '', email: '', gender: '' };
    }
  },
  actions: {
    fetchStudents({ commit, state }) {
      axios.get(state.api + '/students/')
        .then(response => {
          commit('SET_STUDENTS', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchCategories({commit}){
axios.get('http://localhost:8000/api/categories/').then(response =>{
  commit('SET_CATEGORIES',response.data)
})
.catch(error => {
  console.log('Error fetching',error);
});
    },
    fetchItems({commit}){
      axios.get('http://localhost:8000/api/items/').then(response =>{
        commit('SET_ITEMS',response.data)
      })
      .catch(error => {
        console.log('Error fetching',error);
      });
          },          
    fetchProducts({commit}){
      axios.get('http://localhost:8000/api/products/').then(response =>{
        commit('SET_PRODUCTS',response.data)
      })
      .catch(error => {
        console.log('Error fetching',error);
      });
          },
          AddProducts({commit},product){
            axios.post('http://localhost:8000/api/products/',product).then(response =>{
              commit('ADD_PRODUCTS',response.data)
            })
        },
        addCategory({ commit, state }, category) {
          if (state.categories.length >= 0) {
            axios.post('http://localhost:8000/api/categories/', { name: category })
              .then(response => {
                const newCategory = response.data;
                commit('ADD_CATEGORY', newCategory);
              })
              .catch(error => {
                console.log('Error adding category', error);
              });
          }
        },
      AddItem({commit},item){
        axios.post('http://localhost:8000/api/items/',item).then(response =>{
          commit('ADD_ITEM',response.data)
        })
    },
    saveStudent({ dispatch, commit, state }) {
      axios.post(state.api + '/students/', state.student)
        .then(() => {
          dispatch('fetchStudents');
          commit('RESET_NEW_STUDENT');
        })
        .catch(error => {
          console.log(error);
        });
    },
    editStudent({ commit, state }, id) {
      const student = state.students.find(student => student.id === id);
      if (student) {
        commit('SET_CURRENT_STUDENT', { ...student });
      }
    },
    updateStudent({ dispatch, commit, state }, id) {
      axios.put(state.api + `/students/${id}/`, state.currentStudent)
        .then(() => {
          dispatch('fetchStudents');
          commit('RESET_CURRENT_STUDENT');
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteStudent({ dispatch, state }, id) {
      axios.delete(state.api + `/students/${id}/`)
        .then(() => {
          dispatch('fetchStudents');
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    students: state => state.students,
    currentStudent: state => state.currentStudent,
    student: state => state.student,
    categories:state => state.categories,
    items: state => state.items,
    products:state =>state.products,
  }
});