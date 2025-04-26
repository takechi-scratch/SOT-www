export async function fetchProjectData(id: string) {
    try {
        const response = await fetch(`https://sot-api.takechi.f5.si/projects/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (json.status === "OK") {
            return json.data;
        } else {
            throw new Error(`API error! status: ${json.status}`);
        }
    } catch (error) {
        console.error('Error fetching project data:', error);
        throw error;
    }
}
