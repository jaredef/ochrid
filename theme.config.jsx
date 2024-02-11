import Calendar from '/components/datePicker';

export default {
    logo: <span>The Prologue of Ochrid</span>,
    search : {
        placeholder: "Search the Prologue"
    },
    primaryHue: 360,
    primarySaturation: 100,
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
    },
    gitTimestamp: null
  };