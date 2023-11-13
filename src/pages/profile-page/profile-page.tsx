import React from 'react'
import { FormWrapper } from '../../common/components/exports'
import { UpdateUserForm } from '../../modules/auth/update-user-form.tsx/update-user-form'
import { SaveImageForm } from '../../modules/auth/image-form/image-form'

export const ProfilePage = () => {
  return (
    <FormWrapper>
      <UpdateUserForm/>
      <SaveImageForm/>
    </FormWrapper>
  )
}
