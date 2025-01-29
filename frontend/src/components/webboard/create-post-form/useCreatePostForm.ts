import * as yup from 'yup'
import { useState } from 'react'
import { IPostCreate } from '@/types/post'

const postSchema = yup.object().shape({
  title: yup
    .string()
    .required('กรุณากรอกหัวข้อ')
    .max(255, 'หัวข้อต้องไม่เกิน 255 ตัวอักษร'),
  content: yup.string().required('กรุณากรอกเนื้อหา'),
})

export const useCreatePostForm = () => {
  const [postFormData, setPostFormData] = useState<IPostCreate>({
    title: '',
    content: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string
  } | null>(null)

  const handlePostInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setPostFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setFormErrors(null)

    try {
      await postSchema.validate(postFormData, { abortEarly: false })

      const accessToken = localStorage.getItem('accessToken') // Get token from localStorage

      if (!accessToken) {
        throw new Error('No access token found') // Handle missing token
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Include token in Authorization header
        },
        body: JSON.stringify(postFormData),
      })

      console.log('test1', response)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create post')
      }

      // Redirect or show success message
      window.location.href = '/webboard' // Redirect to webboard page
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce(
          (acc: { [key: string]: string }, err) => {
            if (err.path) {
              acc[err.path] = err.message
            }
            return acc
          },
          {}
        )
        setFormErrors(errors)
      } else {
        setFormErrors({ general: (error as Error).message })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    postFormData,
    isLoading,
    formErrors,
    handlePostInputChange,
    handlePostSubmit,
  }
}
