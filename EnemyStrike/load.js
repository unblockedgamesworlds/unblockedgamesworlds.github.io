if (location.protocol.substr(0, 4) === "file")
{
	alert("Web exports won't work until you upload them. (When running on the file: protocol, browsers block many features from working for security reasons.)");
}