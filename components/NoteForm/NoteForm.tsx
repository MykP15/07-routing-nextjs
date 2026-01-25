import css from "./NoteForm.module.css"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/lib/api"


const noteValidationSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title too short").max(50, "Title too long").required("Title is required"),
  content: Yup.string().max(500, "Message too long"),
  tag: Yup.string().required("Tag is required")
})

interface NoteFormProps{
  onCancel: () => void
}

interface NoteFormValues{
  title: string,
  content: string
  tag: string
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo"
};

function NoteForm({ onCancel }: NoteFormProps) {
  
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
        onCancel()
    }
  })

    return (
      <Formik initialValues={initialValues} onSubmit={(values) => {createMutation.mutate(values)
      }} validationSchema={noteValidationSchema}>
        <Form>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
              <Field as="textarea"
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
              />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>
          
          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={createMutation.isPending}>
              Create note
            </button>
          </div>
        </Form>
        </Formik>
    )
}


export default NoteForm

