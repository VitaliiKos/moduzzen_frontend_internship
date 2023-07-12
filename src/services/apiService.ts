import axios from "axios";

import {baseURL} from '../config';


const apiService = axios.create({baseURL: baseURL});

export {apiService};