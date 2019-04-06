import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Icon, Input } from 'antd'

const FormItem = Form.Item

/*
1. 收集表单数据
2. 表单检验
 */

class LoginForm extends Component {

  // 声明组件接收属性的属性名, 属性值的类型, 属性的必须性
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  handleSubmit = (event) => {

    console.log('handleSubmit()')
    // 阻止事件的默认行为
    event.preventDefault()

    const { form } = this.props
    // 进行表单验证
    form.validateFields((err, values) => {
      if (!err) {
        const values = this.props.form.getFieldsValue()
        console.log('发送登this.props.login(values)陆的ajax请求', values)
        this.props.login(values)
      } else {
        // 表单不通过
      }
    })

  }

  // 自动 检验 密码数据
  validatePwd = (rule, value, callback) => {
    value = value.trim()
    if (value === '') {
      callback('密码必须输入')
    } else if (value.lenth < 4 || value.lenth > 8) {
      callback('密码长度必须是4-8位')
    } else {
      callback()  // 通过 验证
    }
  }

  render () {
    // getFieldDecorator(): 用来包装表单项组件标签生成新的组件标签
    const { getFieldDecorator } = this.props.form

    return (
      <Form className='login-form' onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: 'admin',
            rules: [{ whitespace: true, required: true, message: '必须输入用户名' },
              { min: 4, message: '用户名长度不能小于4' }
            ]
          })(
            <Input type='text' prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ validator: this.validatePwd }],
          })(
            <Input type='text' prefix={<Icon type="user"/>} placeholder="请输入密码"/>
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' className='login-form-button'>登陆2</Button>
        </FormItem>
      </Form>
    )
  }
}

const WrapLoginForm = Form.create()(LoginForm)

export default WrapLoginForm


