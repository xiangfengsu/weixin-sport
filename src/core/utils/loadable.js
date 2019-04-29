
export default (component) => {
  const AsyncComponent = () => ({
    component: component(),
    loading: 'loading',
    delay: 200,
    timeout: 3000,
  });
  return {
    render(h) {
      return h(AsyncComponent, {});
    },
  };
};
