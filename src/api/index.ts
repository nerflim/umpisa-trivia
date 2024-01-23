import type { Question } from '@/stores/attempts'
import axios from 'axios'

const AUTH_API = 'https://dummyjson.com'

const TRIVIA_API = 'https://opentdb.com'

const getUsers = () => axios.get(`${AUTH_API}/users`)

const login = (payload: { username: string; password: string }) =>
  axios.post(`${AUTH_API}/auth/login`, payload)

const getCategories = () => axios.get(`${TRIVIA_API}/api_category.php`)

const getQuestions = (payload: { amount: number; category?: number; difficulty?: string }) =>
  axios.get<{
    response_code: number
    results: Question[]
  }>(`${TRIVIA_API}/api.php`, {
    params: payload
  })

export const api = {
  getUsers,
  getCategories,
  getQuestions,
  login
}
