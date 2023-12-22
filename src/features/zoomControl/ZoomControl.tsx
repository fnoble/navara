
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ZoomButton = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 50pt;
    color: white;
    background-color: black;
    opacity: 0.3;
    padding: 0;
    border-radius: 20%;
    &:active {
        opacity: 0.4;
    }
    &:not(:active) {
        transition: opacity 110ms;
    }
`;

const ZoomInButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> }) => {
    return (
        <ZoomButton onClick={onClick}>
            <AddIcon fontSize='inherit' />
        </ZoomButton>
    );
};

const ZoomOutButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> }) => {
    return (
        <ZoomButton onClick={onClick}>
            <RemoveIcon fontSize='inherit' />
        </ZoomButton>
    );
};

const ZoomControlsContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;

    display: flex;
    justify-content: center;
    gap: 150px;
`;

type ZoomControlsProps = {
    onZoomIn: React.MouseEventHandler<HTMLElement>;
    onZoomOut: React.MouseEventHandler<HTMLElement>;
};

export const ZoomControls = ({ onZoomIn, onZoomOut }: ZoomControlsProps) => {
    return (
        <ZoomControlsContainer>
            <ZoomOutButton onClick={onZoomOut} />
            <ZoomInButton onClick={onZoomIn} />
        </ZoomControlsContainer>
    );
};