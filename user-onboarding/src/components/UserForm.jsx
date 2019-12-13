import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

function UserForm({ touched, errors, values, status }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  const clearForm = () => {
    values.name = "";
  };

  return (
    <div className="user-form">
      <Form>
        {/* Name */}
        <label>
          Name
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && <p>{errors.name}</p>}
        </label>

        {/* Email */}
        <label>
          Email
          <Field
            type="email"
            name="email"
            required
            placeholder="enter your email"
          />
        </label>

        {/* Password */}
        <label>
          Password
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </label>

        {/* TOS */}
        <label>
          Agree To Terms Of Service
          <Field
            type="checkbox"
            name="tos"
            placeholder="Name"
            checked={values.tos}
          />
        </label>

        <button onSubmit={clearForm}>Submit</button>
      </Form>
      {users.map(user => {
        return (
          <ul key={Date.now()}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <li>{user.password}</li>
          </ul>
        );
      })}
    </div>
  );
}

const FormikUserForm = withFormik({
  // state names that will be assigned to formiks 'value' prop.
  mapPropsToValues({ name, email, password, tos }) {
    return {
      // State values.
      // formName: stateName
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  // YUP validation and error messaging
  validationSchema: Yup.object().shape({
    name: Yup.string().required("You Must Enter A Name"),
    password: Yup.string().required("You must enter a password")
  }),

  // Handling a submit on the form
  handleSubmit(values, { setStatus, resetForm }) {
    axios.post("https://reqres.in/api/users/", values).then(res => {
      console.log(res.data);
      setStatus(res.data);
      resetForm();
    });
  }
})(UserForm);

export default FormikUserForm;
