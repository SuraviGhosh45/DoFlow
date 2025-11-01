import TaskCard from "./TaskCard";

export default {
  title: "Kanban/TaskCard",
  component: TaskCard,
};

const Template = (args) => <TaskCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Implement drag-and-drop feature",
  description: "Add smooth reordering between columns",
  priority: "high",
};

export const WithoutDescription = Template.bind({});
WithoutDescription.args = {
  title: "Setup Storybook",
  priority: "medium",
};
