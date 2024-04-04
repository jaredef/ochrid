const Ggimage = () => {
       
    const title = "Prologue — The Orthdox Christian Devotional"
    const description = "Lives of the saints";

    return (

          <div
            style={{
              backgroundColor: 'crimson',
              backgroundSize: '1280px 628px',
              backgroundImage: 'url("/twitter-card.png")',
              backgroundRepeat: 'no-repeat',
              height: '628px',
              width: '1280px',
              display: 'flex',
              textAlign: 'left',
              alignItems: 'left',
              justifyContent: 'center',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                color: 'white',
                marginTop: 30,
                padding: '0 80px',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 60,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                color: 'white',
                marginTop: 30,
                padding: '0 80px',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
              }}
            >
              {description}
            </div>
          </div>
        )
            
    }

    export default Ggimage;