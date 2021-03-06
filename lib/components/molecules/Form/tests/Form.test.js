import React from 'react';
import { shallow, mount } from 'enzyme';
import * as Yup from 'yup';
import Form from '..';
import Button from '../../../atoms/Button';

describe('Form Component', () => {
  const userFormProps = {
    initialValues: {
      email: '',
      username: '',
      typeOfUser: '',
    },
    debug: true,
    action: '/',
    validationSchema: {
      username: {
        max: [15, 'Max limit reached'],
        required: 'User name Required',
      },
      email: {
        max: [30, 'Max reached'],
        email: 'Invalid email format',
        required: 'Required',
      },
    },
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  test('should render select tag correctly', () => {
    const userFormSelectProps = {
      options: ['Admin', 'Read Only'],
      name: 'typeOfUser',
      label: 'Type of user',
      validateOnBlur: true,
    };
    const SelectForm = (
      <Form {...userFormProps}>
        <div>
          <Form.Select {...userFormSelectProps} />
        </div>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
    const Wrapper = shallow(SelectForm);
    expect(Wrapper).toMatchSnapshot();
  });

  test('should render input text field', () => {
    const userFormNameInputProps = {
      name: 'username',
      type: 'text',
      label: 'User Name',
    };
    const InputForm = (
      <Form {...userFormProps}>
        <div>
          <Form.Input {...userFormNameInputProps} />
        </div>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
    const Wrapper = mount(InputForm);
    expect(Wrapper.find('input')).toHaveLength(1);
    expect(Wrapper).toMatchSnapshot();
  });

  test('should render select field', () => {
    const userFormSelectProps = {
      options: ['Admin', 'Read Only'],
      name: 'typeOfUser',
      label: 'Type of user',
    };
    const SelectForm = (
      <Form {...userFormProps}>
        <div>
          <Form.Select {...userFormSelectProps} />
        </div>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
    const Wrapper = mount(SelectForm);
    expect(Wrapper.find('select')).toHaveLength(1);
    expect(Wrapper).toMatchSnapshot();
  });

  test('should render input field with yupValidationSchema', () => {
    const userFormNameInputProps = {
      name: 'username',
      type: 'text',
      label: 'User Name',
    };
    const InputForm = (
      <Form {...userFormProps} yupValidationSchema={SignupSchema}>
        <div>
          <Form.Input {...userFormNameInputProps} />
        </div>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
    const Wrapper = mount(InputForm);
    expect(Wrapper.find('input')).toHaveLength(1);
    expect(Wrapper).toMatchSnapshot();
  });

  test('should render input field with no validation', () => {
    const userFormNameInputProps = {
      name: 'username',
      type: 'text',
      label: 'User Name',
    };

    const formProps = { ...userFormProps };
    delete formProps.validationSchema;
    const InputForm = (
      <Form {...formProps}>
        <div>
          <Form.Input {...userFormNameInputProps} />
        </div>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
    const Wrapper = mount(InputForm);
    expect(Wrapper.find('input')).toHaveLength(1);
    expect(Wrapper).toMatchSnapshot();
  });

  test('getSchema should return null if no params are passed', () => {
    const userFormNameInputProps = {
      name: 'username',
      type: 'text',
      label: 'User Name',
    };

    const formProps = { ...userFormProps };
    delete formProps.validationSchema;
    const InputForm = (
      <Form {...formProps}>
        <div>
          <Form.Input {...userFormNameInputProps} />
        </div>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
    const Wrapper = mount(InputForm);
    expect(Wrapper.instance().getSchema()).toBeNull();
  });
});
