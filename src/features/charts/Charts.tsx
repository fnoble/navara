import { Charts } from "../../common/types/signalk";
import { useGetChartsQuery } from "../../signalk/signalk";
 
const ChartsListElement: React.FC<{ charts: Charts }> = ({ charts }) => {
    const listItems = Object.entries(charts).map(([_key, chart], _i) =>
        <li>{chart.name}</li>
    );
    return <ul>{listItems}</ul>;
};

export const ChartsList = () => {
    const { data, error, isLoading } = useGetChartsQuery(null);
    return (
        <div className="ChartsList">
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <ChartsListElement charts={data} />
          ) : null}
        </div>
    )
};