import { Component } from 'react';
import fetch from './plugins/axios'

class Axios extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
    this.getContactWay = this.getContactWay.bind(this)
  }

  componentDidMount() {
    this.getContactWay()
  }

  async getContactWay() {
    try {
      const { QQ, WX, servertime, upurl } = await fetch('GetQQWX', {})
    } catch (error) {
      console.log(error)
    }
  }

  render() { 
    return null
  }
}
 
export default Axios;