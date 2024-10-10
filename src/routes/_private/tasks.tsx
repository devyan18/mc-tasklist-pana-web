import { createFileRoute } from '@tanstack/react-router'
import { TaskList } from '../../components/TaskList'
import { Descriptor } from '../../components/Descriptor'
import { Divider } from '../../components/Divider'

export const Route = createFileRoute('/_private/tasks')({
  beforeLoad: async ({ context }) => {
    const { user } = context.authentication

    if (user === undefined) {
      // loading
    }
  },
  component: () => (
    <>
      <TaskList />
      <Divider />
      <Descriptor />
    </>
  ),
})
