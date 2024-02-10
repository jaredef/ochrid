import Calendar from '/components/datePicker';

export default {
    logo: <span>The Prologue of Ochrid</span>,
    search : {
        placeholder: "Search the Prologue"
    },
    editLink: {
        component: null
    },
    feedback : {
        content: null
    },
    sidebar: {
        autoCollapse: true,
        defaultMenuCollapseLevel : 1,
        titleComponent: ({ type, title }) => {
            if (title === 'Calendar') {
                return <Calendar />;
            }
            return <>{title}</>
        }
    }
  };