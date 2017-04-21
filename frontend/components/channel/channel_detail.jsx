import { Link, hashHistory } from 'react-router';


const ChannelDetail = ({channel}) => {
  return (
    <div>
      <section>
        <h1>Channel Name</h1>
        <div>exit icon</div>
      </section>

      <section>
        <h1>Channel Details</h1>
        <p>Channel Purpose</p>
        <p>Channel Description</p>
      </section>

      <section>
        <h1>Members</h1>
        <ul>
          <li>member 2</li>
          <li>member 1</li>
        </ul>
      </section>

    </div>
  );
};

export default ChannelDetail;
